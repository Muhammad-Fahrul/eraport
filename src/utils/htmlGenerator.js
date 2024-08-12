export const recordSanitizer = (record) => {
  return Object.entries(record)
    .map(([keyword, value]) => {
      if (
        keyword === '_id' ||
        keyword === 'studentId' ||
        keyword === 'raportId' ||
        keyword === 'updatedAt' ||
        keyword === '__v'
      ) {
        return;
      }
      if (keyword === 'createdAt') {
        const waktu = new Date(value.split('T'));
        return {
          value: new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(waktu),
          keyword: 'tanggal',
        };
      }

      return { value, keyword };
    })
    .filter((key) => key !== undefined);
};
