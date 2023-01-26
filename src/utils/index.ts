/**
 * @description 格式化并返回json地图中的（地点名称,坐标)
 * @param mapJson
 * @returns
 */

export const formatMapText = (mapJson: any) => {
  const { features = [] } = mapJson;
  return features.map((feat) => {
    const {
      properties: { geo_wkt, name },
    } = feat;
    const str = geo_wkt.split(' ');
    const altitude = parseFloat(str[1].split('(')[1]);
    const longitude = parseFloat(str[2]);
    return { name, position: [altitude, longitude] };
  });
};
