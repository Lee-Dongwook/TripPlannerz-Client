export const convertPreferenceRankToTypeName = (rank: { type: number }[]): string => {
  let ranklist: string = '';

  rank.forEach((item, index) => {
    let typeName = '';
    switch (item.type) {
      case 12:
        typeName = '관광지';
        break;

      case 14:
        typeName = '문화시설';
        break;

      case 15:
        typeName = '축제/공연/행사';
        break;

      case 28:
        typeName = '레포츠';
        break;

      case 32:
        typeName = '숙박';
        break;

      case 38:
        typeName = '쇼핑';
        break;

      case 39:
        typeName = '맛집';
        break;

      default:
        break;
    }
    ranklist += typeName;

    if (index !== rank.length - 1) {
      ranklist += ', ';
    }
  });

  return ranklist;
};
