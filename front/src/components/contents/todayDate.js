function todayDate () {
    const today = new Date();
    let todayMonth = today.getMonth()
    if (todayMonth <= 9) todayMonth = "0" + todayMonth;
    let todayDay = today.getDate()
    if (todayDay <= 9) todayDay = "0" + todayDay;
     
    return today.getFullYear() + "-" + todayMonth + "-" + todayDay;
}
  