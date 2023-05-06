// 시간 표시

export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일 전`;
  }

  const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);
  if (betweenTimeWeek < 5) {
    return `${betweenTimeWeek}주 전`;
  }
  if (betweenTimeDay > 365) {
    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }
  if (betweenTimeDay > 31) {
    return `${Math.floor(betweenTimeDay / 30)}개월 전`;
  }
};

// NumberFormat
export const compactNumberFormatter = new Intl.NumberFormat("ko", {
  notation: "compact",
});
