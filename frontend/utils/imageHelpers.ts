// Helper functions for image handling

export const getInitials = (fullName: string | undefined): string => {
  if (!fullName || !fullName.trim()) return '?';
  
  const names = fullName.trim().split(' ');
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return fullName.charAt(0).toUpperCase();
};

export const getBackgroundColor = (fullName: string | undefined): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-teal-500'
  ];

  if (!fullName) return colors[0];
  
  // Generate a consistent color based on the name
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

export const renderAvatar = (
  profileImage: string | undefined | null,
  fullName: string | undefined
): { isImage: boolean; content: string; bgColor?: string } => {
  if (profileImage && profileImage.startsWith('data:image')) {
    return { isImage: true, content: profileImage };
  }
  
  return {
    isImage: false,
    content: getInitials(fullName),
    bgColor: getBackgroundColor(fullName)
  };
};
