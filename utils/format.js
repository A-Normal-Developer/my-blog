import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import rTime from "dayjs/plugin/relativeTime"
dayjs.locale("zh-cn")
dayjs.extend(rTime)


export function dateRelativeFormat(date) {
  return dayjs().to(dayjs(date))
}

/**
 * 返回随机色值
 */
export let getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
};