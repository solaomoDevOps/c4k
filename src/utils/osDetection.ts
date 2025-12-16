export type OSType = 'windows' | 'mac' | 'linux' | 'ios' | 'android' | 'unknown';

export function detectOS(): OSType {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }

  if (/android/.test(userAgent)) {
    return 'android';
  }

  if (/mac/.test(platform) || /macintosh/.test(userAgent)) {
    return 'mac';
  }

  if (/win/.test(platform) || /windows/.test(userAgent)) {
    return 'windows';
  }

  if (/linux/.test(platform) || /linux/.test(userAgent)) {
    return 'linux';
  }

  return 'unknown';
}

export function getOSDisplayName(os: OSType): string {
  switch (os) {
    case 'windows':
      return 'Windows PC';
    case 'mac':
      return 'Mac';
    case 'linux':
      return 'Linux';
    case 'ios':
      return 'iOS';
    case 'android':
      return 'Android';
    default:
      return 'Unknown';
  }
}

export function validateComputerType(selected: 'mac' | 'pc', detected: OSType): {
  isValid: boolean;
  message?: string;
} {
  if (selected === 'mac' && detected !== 'mac') {
    return {
      isValid: false,
      message: `You selected Mac, but we detected you're using ${getOSDisplayName(detected)}. Please select the correct computer type.`,
    };
  }

  if (selected === 'pc' && detected === 'mac') {
    return {
      isValid: false,
      message: `You selected Windows PC, but we detected you're using a Mac. Please select the correct computer type.`,
    };
  }

  return { isValid: true };
}
