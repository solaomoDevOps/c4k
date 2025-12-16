import { supabase } from './supabase';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

const USE_PHP_BACKEND = import.meta.env.VITE_USE_PHP_BACKEND === 'true';
const API_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private removeAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  async signUp(email: string, password: string): Promise<ApiResponse<{ user: any; message?: string }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/auth.php?action=signup`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Sign up failed' };
        }

        return {
          data: {
            user: result.user,
            message: result.message
          }
        };
      } catch (error: any) {
        console.error('Sign up error:', error);
        return { error: error.message || 'Sign up failed' };
      }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { data: { user: data.user } };
    } catch (error: any) {
      return { error: error.message || 'Sign up failed' };
    }
  }

  async signIn(email: string, password: string): Promise<ApiResponse<{ user: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/auth.php?action=signin`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Sign in failed' };
        }

        this.setAuthToken(result.token);
        return { data: { user: result.user } };
      } catch (error: any) {
        console.error('Sign in error:', error);
        return { error: error.message || 'Sign in failed' };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { data: { user: data.user } };
    } catch (error: any) {
      return { error: error.message || 'Sign in failed' };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const token = this.getAuthToken();

        if (!token) {
          return { error: 'Not authenticated' };
        }

        const response = await fetch(`${API_URL}/auth.php`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          this.removeAuthToken();
          return { error: result.error || 'Failed to get user' };
        }

        return { data: { user: result.user } };
      } catch (error: any) {
        console.error('Get user error:', error);
        return { error: error.message || 'Failed to get user' };
      }
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return { error: error.message };
      }

      return { data: { user } };
    } catch (error: any) {
      return { error: error.message || 'Failed to get user' };
    }
  }

  async signOut(): Promise<ApiResponse<void>> {
    if (USE_PHP_BACKEND) {
      this.removeAuthToken();
      return { data: undefined };
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error: error.message };
      }

      return { data: undefined };
    } catch (error: any) {
      return { error: error.message || 'Sign out failed' };
    }
  }

  async getChildren(): Promise<ApiResponse<{ children: any[] }>> {
    if (USE_PHP_BACKEND) {
      try {
        const token = this.getAuthToken();

        if (!token) {
          return { error: 'Not authenticated' };
        }

        const response = await fetch(`${API_URL}/children.php`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to get children' };
        }

        return { data: { children: result.children || [] } };
      } catch (error: any) {
        console.error('Get children error:', error);
        return { error: error.message || 'Failed to get children' };
      }
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return { error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        return { error: error.message };
      }

      return { data: { children: data || [] } };
    } catch (error: any) {
      return { error: error.message || 'Failed to get children' };
    }
  }

  async createChild(childData: {
    name: string;
    hand_preference: 'left' | 'right';
    computer_type: 'mac' | 'pc';
    career_role?: string;
    age_group?: string;
  }): Promise<ApiResponse<{ child: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const token = this.getAuthToken();

        const response = await fetch(`${API_URL}/children.php`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(childData),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to create child' };
        }

        if (result.child && !token) {
          localStorage.setItem('guestChildId', result.child.id);
        }

        return { data: { child: result.child } };
      } catch (error: any) {
        console.error('Create child error:', error);
        return { error: error.message || 'Failed to create child' };
      }
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const insertData = {
        ...childData,
        user_id: user?.id || null,
        xp: 0,
        level: 1,
        current_streak: 0,
        longest_streak: 0,
        total_play_time: 0,
        selected_avatar: 'robot',
      };

      const { data, error } = await supabase
        .from('children')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      if (data && !user) {
        localStorage.setItem('guestChildId', data.id);
      }

      return { data: { child: data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to create child' };
    }
  }

  async updateChild(id: string, updateData: any): Promise<ApiResponse<{ child: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const token = this.getAuthToken();

        const response = await fetch(`${API_URL}/children.php?id=${id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(updateData),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to update child' };
        }

        return { data: { child: result.child } };
      } catch (error: any) {
        console.error('Update child error:', error);
        return { error: error.message || 'Failed to update child' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('children')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { child: data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to update child' };
    }
  }

  async getLessons(): Promise<ApiResponse<{ lessons: any[] }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/lessons.php`, {
          method: 'GET',
          mode: 'cors',
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to get lessons' };
        }

        return { data: { lessons: result.lessons || [] } };
      } catch (error: any) {
        console.error('Get lessons error:', error);
        return { error: error.message || 'Failed to get lessons' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('category')
        .order('lesson_number');

      if (error) {
        return { error: error.message };
      }

      return { data: { lessons: data || [] } };
    } catch (error: any) {
      return { error: error.message || 'Failed to get lessons' };
    }
  }

  async getProgress(childId: string): Promise<ApiResponse<{ progress: any[] }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/progress.php?child_id=${childId}`, {
          method: 'GET',
          mode: 'cors',
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to get progress' };
        }

        return { data: { progress: result.progress || [] } };
      } catch (error: any) {
        console.error('Get progress error:', error);
        return { error: error.message || 'Failed to get progress' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('child_id', childId);

      if (error) {
        return { error: error.message };
      }

      return { data: { progress: data || [] } };
    } catch (error: any) {
      return { error: error.message || 'Failed to get progress' };
    }
  }

  async saveProgress(progressData: {
    child_id: string;
    lesson_id: string;
    completed: boolean;
    score: number;
    time_spent: number;
  }): Promise<ApiResponse<{ progress: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/progress.php`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(progressData),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to save progress' };
        }

        return { data: { progress: result.progress } };
      } catch (error: any) {
        console.error('Save progress error:', error);
        return { error: error.message || 'Failed to save progress' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('progress')
        .upsert({
          child_id: progressData.child_id,
          lesson_id: progressData.lesson_id,
          completed: progressData.completed,
          score: progressData.score,
          time_spent: progressData.time_spent,
          completed_at: progressData.completed ? new Date().toISOString() : null,
        }, {
          onConflict: 'child_id,lesson_id',
        })
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { progress: data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to save progress' };
    }
  }

  async getSettings(childId: string): Promise<ApiResponse<{ settings: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/settings.php?child_id=${childId}`, {
          method: 'GET',
          mode: 'cors',
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to get settings' };
        }

        return { data: { settings: result.settings } };
      } catch (error: any) {
        console.error('Get settings error:', error);
        return { error: error.message || 'Failed to get settings' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('child_id', childId)
        .maybeSingle();

      if (error) {
        return { error: error.message };
      }

      if (!data) {
        const defaultSettings = {
          child_id: childId,
          audio_enabled: true,
          text_size: 'medium' as const,
          difficulty_level: 1,
          screen_time_limit: 0,
        };

        const { data: newSettings, error: insertError } = await supabase
          .from('settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (insertError) {
          return { error: insertError.message };
        }

        return { data: { settings: newSettings } };
      }

      return { data: { settings: data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to get settings' };
    }
  }

  async updateSettings(childId: string, settingsData: any): Promise<ApiResponse<{ settings: any }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/settings.php?child_id=${childId}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settingsData),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to update settings' };
        }

        return { data: { settings: result.settings } };
      } catch (error: any) {
        console.error('Update settings error:', error);
        return { error: error.message || 'Failed to update settings' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('settings')
        .update(settingsData)
        .eq('child_id', childId)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { settings: data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to update settings' };
    }
  }

  async checkDailyReward(childId: string): Promise<ApiResponse<{ can_claim: boolean }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/daily-rewards.php?child_id=${childId}&action=check`, {
          method: 'GET',
          mode: 'cors',
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to check daily reward' };
        }

        return { data: { can_claim: result.can_claim } };
      } catch (error: any) {
        console.error('Check daily reward error:', error);
        return { error: error.message || 'Failed to check daily reward' };
      }
    }

    try {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('daily_rewards')
        .select('*')
        .eq('child_id', childId)
        .eq('reward_date', today)
        .maybeSingle();

      if (error) {
        return { error: error.message };
      }

      return { data: { can_claim: !data } };
    } catch (error: any) {
      return { error: error.message || 'Failed to check daily reward' };
    }
  }

  async claimDailyReward(childId: string): Promise<ApiResponse<{ success: boolean; xp_earned: number; new_streak: number }>> {
    if (USE_PHP_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/daily-rewards.php`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ child_id: childId }),
        });

        const result = await response.json();

        if (!response.ok) {
          return { error: result.error || 'Failed to claim daily reward' };
        }

        return {
          data: {
            success: result.success,
            xp_earned: result.xp_earned,
            new_streak: result.new_streak,
          },
        };
      } catch (error: any) {
        console.error('Claim daily reward error:', error);
        return { error: error.message || 'Failed to claim daily reward' };
      }
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const xpEarned = 10;

      const { error } = await supabase
        .from('daily_rewards')
        .insert({
          child_id: childId,
          reward_date: today,
          xp_earned: xpEarned,
        });

      if (error) {
        return { error: error.message };
      }

      const { data: child } = await supabase
        .from('children')
        .select('current_streak, longest_streak')
        .eq('id', childId)
        .single();

      const newStreak = (child?.current_streak || 0) + 1;
      const longestStreak = Math.max(newStreak, child?.longest_streak || 0);

      await supabase
        .from('children')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
        })
        .eq('id', childId);

      return {
        data: {
          success: true,
          xp_earned: xpEarned,
          new_streak: newStreak,
        },
      };
    } catch (error: any) {
      return { error: error.message || 'Failed to claim daily reward' };
    }
  }
}

export const api = new ApiClient();
