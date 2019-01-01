function secondsToHuman(seconds)
{
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    var time_str = numminutes + " minutes " + numseconds.toFixed() + " seconds";
    if (numhours > 0) {
      time_str = numhours + " hours " + time_str
    }
    
    if (numdays > 0) {
      time_str = numdays + " days " + time_str
    }

    if (numyears > 0) {
      time_str = numyears + " years " +  time_str
    }

    return time_str
}

function byteToHuman(bytes) {
  if (bytes == "0" || bytes == "") {
    return '0 bytes'
  } else {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
  }
}
