import { SettingService } from "../service/setting/setting.service";

/**
 * Return settings from server use in getServerSideProps()
 * @returns
 */
export async function getSetting(key = null) {
  let data = null;

  try {
    let res;
    if (key) {
      res = await SettingService.findOne(key);
    } else {
      res = await SettingService.findAll();
    }

    if (res.data.status == "success") {
      data = await res.data.data;
    } else {
      data = null;
    }
  } catch (error) {
    data = null;
  }
  return data;
}

export function getSettingValue(key: string, array: any) {
  if (array.length > 0) {
    return array.find((set: any) => set.key == key).value;
  } else {
    return null;
  }
}
