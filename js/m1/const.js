export const CONST_MONTHS ={
        "1": "Tháng 1",
        "2": "Tháng 2",
        "3": "Tháng 3",
        "4": "Tháng 4",
        "5": "Tháng 5",
        "6": "Tháng 6",
        "7": "Tháng 7",
        "8": "Tháng 8",
        "9": "Tháng 9",
        "10": "Tháng 10",
        "11": "Tháng 11",
        "12": "Tháng 12",
    };
export const WS_URL = "http://192.168.0.102:8080/IdempiereWS/rest/";
export const MARGIN_CHART ={"width":50, "height":250};
export const MIN_YEAR = 2016;
export const AS_UID = "UID";
export const AS_TOKEN = "TOKEN";

export const _convertNumber = (value) => {
    if(!value) {
      return "";
    } else {
      //let x = value.toLocaleString('en');
      var x = value.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
          x = x.replace(pattern, "$1,$2");
      return x;
    }
  }