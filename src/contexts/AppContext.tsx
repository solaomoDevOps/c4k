import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';

export interface Child {
  id: string | number;
  name: string;
  hand_preference: 'left' | 'right';
  computer_type: 'mac' | 'pc';
  selected_avatar?: string;
  career_role?: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  avatar?: string;
  age_group?: string;
  total_play_time: number;
  created_at: string;
  last_active: string;
  user_id?: string | number;
  last_login_date?: string;
}

export interface Lesson {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  order?: number;
  lesson_number?: number;
  computer_type?: string;
  content?: any;
}

export interface Progress {
  id?: string | number;
  child_id: string | number;
  lesson_id: string | number;
  completed: boolean;
  score: number;
  attempts: number;
  time_spent: number;
  completed_at?: string;
}

export interface Settings {
  id?: string | number;
  child_id: string | number;
  audio_enabled: boolean;
  text_size: 'small' | 'medium' | 'large';
  difficulty_level: number;
  screen_time_limit: number;
}

export interface DailyReward {
  child_id: string | number;
  reward_date: string;
  xp_earned: number;
}

interface AppContextType {
  currentChild: Child | null;
  setCurrentChild: (child: Child | null) => void;
  user: any;
  isEmailVerified: boolean;
  isReturningUser: boolean;
  lessons: Lesson[];
  progress: Progress[];
  settings: Settings | null;
  dailyReward: DailyReward | null;
  refreshProgress: () => Promise<void>;
  updateProgress: (lessonId: string | number, data: Partial<Progress>) => Promise<void>;
  completeLesson: (lessonId: string | number, score: number, timeSpent: number) => Promise<void>;
  createChild: (name: string, handPreference: 'left' | 'right', computerType: 'mac' | 'pc', guestMode?: boolean, careerRole?: string, ageGroup?: string) => Promise<Child>;
  updateChildCareerRole: (careerRole: string) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  checkDailyReward: () => Promise<boolean>;
  claimDailyReward: () => Promise<void>;
  getLevel: () => string;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentChild, setCurrentChildState] = useState<Child | null>(null);
  const [user, setUser] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [dailyReward, setDailyReward] = useState<DailyReward | null>(null);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    loadUser();
    loadLessons();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        loadChildren(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentChildState(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentChild) {
      localStorage.setItem('currentChildId', String(currentChild.id));
      loadProgress();
      loadSettings();
    } else {
      localStorage.removeItem('currentChildId');
    }
  }, [currentChild]);

  const loadUser = async () => {
    const response = await api.getCurrentUser();
    if (response.data?.user) {
      setUser(response.data.user);
      loadChildren(response.data.user.id);
    } else {
      const guestChildId = localStorage.getItem('guestChildId');
      if (guestChildId) {
        loadGuestChild(guestChildId);
      }
    }
  };

  const loadGuestChild = async (childId: string) => {
    const { data: child, error } = await supabase
      .from('children')
      .select('*')
      .eq('id', childId)
      .maybeSingle();

    if (child && !error) {
      setCurrentChildState(child);
      setIsReturningUser(true);
    }
  };

  const loadChildren = async (userId: number) => {
    const response = await api.getChildren();
    if (response.data?.children && response.data.children.length > 0) {
      const savedChildId = localStorage.getItem('currentChildId');
      let childToLoad = response.data.children[0];

      if (savedChildId) {
        const found = response.data.children.find((c: Child) => String(c.id) === savedChildId);
        if (found) {
          childToLoad = found;
        }
      }

      setCurrentChildState(childToLoad);
      setIsReturningUser(true);
    }
  };

  const loadLessons = async () => {
    const response = await api.getLessons();
    if (response.data?.lessons) {
      setLessons(response.data.lessons);
    }
  };

  const loadProgress = async () => {
    if (!currentChild) return;

    const response = await api.getProgress(String(currentChild.id));
    if (response.data?.progress) {
      setProgress(response.data.progress);
    }
  };

  const loadSettings = async () => {
    if (!currentChild) return;

    const response = await api.getSettings(String(currentChild.id));
    if (response.data?.settings) {
      setSettings(response.data.settings);
    }
  };

  const setCurrentChild = (child: Child | null) => {
    setCurrentChildState(child);
  };

  const refreshProgress = async () => {
    await loadProgress();
  };

  const updateProgress = async (lessonId: string | number, data: Partial<Progress>) => {
    if (!currentChild) return;

    const progressData = {
      child_id: String(currentChild.id),
      lesson_id: String(lessonId),
      completed: data.completed || false,
      score: data.score || 0,
      time_spent: data.time_spent || 0,
    };

    await api.saveProgress(progressData);
    await refreshProgress();
  };

  const completeLesson = async (lessonId: string | number, score: number, timeSpent: number) => {
    if (!currentChild) return;

    await updateProgress(lessonId, {
      completed: true,
      score,
      time_spent: timeSpent,
      completed_at: new Date().toISOString()
    });
  };

  const createChild = async (
    name: string,
    handPreference: 'left' | 'right',
    computerType: 'mac' | 'pc',
    guestMode = false,
    careerRole?: string,
    ageGroup?: string
  ): Promise<Child> => {
    if (guestMode) {
      const guestChild: Child = {
        id: 'guest-' + Date.now(),
        name,
        hand_preference: handPreference,
        computer_type: computerType,
        career_role: careerRole,
        age_group: ageGroup || '5-7',
        xp: 0,
        level: 1,
        current_streak: 0,
        longest_streak: 0,
        total_play_time: 0,
        created_at: new Date().toISOString(),
        last_active: new Date().toISOString(),
      };

      localStorage.setItem('guestChild', JSON.stringify(guestChild));
      setCurrentChildState(guestChild);
      setIsReturningUser(false);
      return guestChild;
    }

    const childData = {
      name,
      hand_preference: handPreference,
      computer_type: computerType,
      career_role: careerRole,
      age_group: ageGroup || '5-7',
    };

    const response = await api.createChild(childData);

    if (response.data?.child) {
      setCurrentChildState(response.data.child);
      setIsReturningUser(false);
      return response.data.child;
    }

    throw new Error('Failed to create child profile');
  };

  const updateChildCareerRole = async (careerRole: string) => {
    if (!currentChild) return;

    const response = await api.updateChild(String(currentChild.id), { career_role: careerRole });

    if (response.data?.child) {
      setCurrentChildState(response.data.child);
    }
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
    setCurrentChildState(null);
    setIsReturningUser(false);
    localStorage.removeItem('currentChildId');
    localStorage.removeItem('guestChildId');
  };

  const addXP = async (amount: number) => {
    if (!currentChild) return;

    const newXP = (currentChild.xp || 0) + amount;
    const newLevel = Math.floor(newXP / 100) + 1;

    const response = await api.updateChild(String(currentChild.id), {
      xp: newXP,
      level: newLevel
    });

    if (response.data?.child) {
      setCurrentChildState(response.data.child);
    }
  };

  const checkDailyReward = async (): Promise<boolean> => {
    if (!currentChild) return false;

    const response = await api.checkDailyReward(String(currentChild.id));
    return response.data?.can_claim || false;
  };

  const claimDailyReward = async () => {
    if (!currentChild) return;

    const response = await api.claimDailyReward(String(currentChild.id));

    if (response.data?.success) {
      const updatedChild = {
        ...currentChild,
        xp: (currentChild.xp || 0) + (response.data.xp_earned || 10),
        current_streak: response.data.new_streak,
        level: Math.floor(((currentChild.xp || 0) + (response.data.xp_earned || 10)) / 100) + 1
      };
      setCurrentChildState(updatedChild);
    }
  };

  const getLevel = (): string => {
    if (!currentChild) return 'Novice';
    const level = currentChild.level || 1;
    if (level === 1) return 'Novice';
    if (level >= 2 && level <= 3) return 'Explorer';
    return 'Pro';
  };

  return (
    <AppContext.Provider value={{
      currentChild,
      setCurrentChild,
      user,
      isEmailVerified: !!user,
      isReturningUser,
      lessons,
      progress,
      settings,
      dailyReward,
      refreshProgress,
      updateProgress,
      completeLesson,
      createChild,
      updateChildCareerRole,
      addXP,
      checkDailyReward,
      claimDailyReward,
      getLevel,
      signOut
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
