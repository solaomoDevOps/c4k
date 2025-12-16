import { Monitor, Smartphone } from 'lucide-react';

interface MobileWarningProps {
  allowRegistration?: boolean;
}

export default function MobileWarning({ allowRegistration = false }: MobileWarningProps) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-300 rounded-xl p-3 mb-4 shadow-sm">
      <div className="flex items-center gap-3 text-left">
        <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full p-2 shadow-md flex-shrink-0">
          <Monitor className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 mb-0.5">
            Desktop Required
          </h3>
          <p className="text-xs text-gray-600 leading-tight">
            {allowRegistration
              ? "Lessons require desktop. You can register on mobile."
              : "Please use a desktop computer for lessons."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
