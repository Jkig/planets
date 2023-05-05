export default function brightnessCalc(luminosity) {
    if (luminosity < 3e25){
        return 1
      }else if (luminosity > 3e27){
        return 3
      }else if (luminosity > 3e28){
        return 5
      }else if (luminosity > 3e29){
        return 7
      }else if (luminosity > 3e31){
        return 10
      }else if (luminosity > 3e33){
        return 15
      }
      return 2
}