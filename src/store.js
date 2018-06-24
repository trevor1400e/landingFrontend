const store =  {
  userData: {
    user: null
  },
  portalData: {
    darkTheme: Boolean(localStorage.getItem('darkTheme')),
    fullscreen: false
  },
  setUser(user){
    this.userData.user = user
  },
  setDarkTheme(darkTheme){
    this.portalData.darkTheme = darkTheme
  },
  setFullscreen(fullscreen){
    this.portalData.fullscreen = fullscreen
  }
};

export default store;
