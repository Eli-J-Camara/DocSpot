import { 
  FETCH_SERVICES_SUCCESS, 
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  SET_AUTH_USER, 
  RESET_AUTH_STATE } from 'types'
  import db from 'db'
import * as api from 'api'

export const fetchServices = () => dispatch =>
   api
    .fetchServices()
    .then(services => dispatch(
      {
        type: FETCH_SERVICES_SUCCESS,
        services
      }
    )
  )


export const fetchServiceById = serviceId => (dispatch, getState) => {
  const lastService = getState().selectedService.item
  if (lastService.id && lastService.id === serviceId) { return Promise.resolve() }

  dispatch({type: REQUEST_SERVICE})
  return api
    .fetchServiceById(serviceId)
    .then(service => dispatch(
      {
        type: FETCH_SERVICE_SUCCESS,
        service
      }
    )
  )
}

export const register = registerFormData => api.register({...registerFormData})
export const login = loginData => api.login({...loginData})
export const onAuthStateChanged = onAuthCallback => api.onAuthStateChanged(onAuthCallback)

export const logout = () => dispatch => 
  api.logout().then(_ => dispatch({user: null, type: SET_AUTH_USER})) 

export const storeAuthUser = authUser => dispatch => {
  if (authUser) {
    return api
      .getUserProfile(authUser.uid)
      .then(userWithProfile => dispatch({user: userWithProfile, type: SET_AUTH_USER}))
  } else {
    return dispatch({user: null, type: SET_AUTH_USER})
  }
}

export const resetAuthState = () => ({type: RESET_AUTH_STATE})













const services = [{
  id: '2asd8sa7d98',
  user: 'some_id_1',
  category: 'Allergists/Immunologists',
  title: 'Allergists/Immunologists',
  description: 'They treat immune system disorders such as asthma, eczema, food allergies, insect sting allergies, and some autoimmune diseases.',
  price: 10, //per hour
  image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFRUVFRUSFRUVFRUWFRUVFRUWFxYVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICUrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0uLS0tLS0tLS0tLSstLS0tLS0tLf/AABEIAKkBKQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgEHAAj/xAA+EAABAwIDBQQIBQMCBwAAAAABAAIDBBESITEFQVFhcQYTgZEUIjKhscHR8AdCUmLhFXLxgpIjJDNDg6Ky/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQMAAgQFBgf/xAAuEQACAgEDAwIFBAIDAAAAAAAAAQIRAwQSIQUxQRNRFCIyYbEVcYGRQvAzUqH/2gAMAwEAAhEDEQA/ALGozZ4KtjKeppA6PwVfoUxiolhCUUpaAplAYfBTCiAiNCBDtlJoX1kVjVAnWhQnGSZa1RkYgQq2ozFqo9kU7W4SwudbN5JvflwCphsl2Nw0Y0+27S2uXE9Exc9jPJKPLE2FFY1xNgCTyzUK/adPBbCBLY+uXaZ/pAyGai/tduY1relh8FqhpcjOfk6jhi2rLGOifoS1ttxOfkE7BOxoAxXJNstLWuT5LE1m23F17kX1scxbeOn1Vn2dY6aQGxwg4nHcMiCPG+i0fCRirbMX6nknJKK7mwicSL2tfPoNykYijDJCknAWfZfg3rK482Akicq6pjcDofIp99YFH04IfDk+NXkqcaKx6dfWtOtvFBkfGdwHTJD4eRZayALvFV9o8Ridh1srKQNyte17cS5x3NHzK46FjzgBJbo52gvvDTvPPQKr08yS1eJqrMz2PnLmG+oNitIKd7tAfHK/S6lTU1HStxsZvOG5c5zzxsT71CCte7FNIcDRoN9twaOKvi0rrkzZNdDHUVyxet7Oh7SJHAD9ubugvkm9hbCpY/VBe8jTG75CyqH7WxPxOyaAQ1t/eea+O1C1hIcL6tAuT47gE99Pjt47mSHVn6qb7GzxsZ7IA6CyH/USND4HQrPjaWJodfUJd9aVx22nR6+MFKKaNbHtISDLUZEbwUCSTiVkjXuY7G3Uaj9Td468Fe01Q2RoeDcHP+OqfjlYjJDayUh5pR8vNHqZARYKpmfZNQklK8lCc917NuVwDe7IcN5+ihLNlYZD49TvRsAd20nsbbFc8BoOp3pb+pS/q9w+iVkK4hZKJUbgGCyTlPrLlHUC1lGd2aSy0RymcnmKspirKIoDAgCm1cCkFCEwERi40KTVAh2hd7snIC53BTpoi42H+ESKqa+UU0TrEg45N9mi5DFfHic+fCM+bURxUn3fZF9IxZXtPDVOdhiY5zLDQtFnEkWzPRLdq9vyxVD4hcNGHDzGEZ887qnHaObTEuhptM41NNHG12ujO8TT4YvJ2frHZGIjccTmAaHnu1Um9lJ2ta58kYxWDbEuc4nQAAZlHm29I4Zu1xHzbh+qDUbbeXBwNsDcLOV22uOa11P3RzPUglUYstIOzsLZGte8yvbm/wDIxuRyNjcnXK/VXrdrRxtDWgNbmQ1osA0autz3cbrCR15AIufWOfP7A965JXEkknM/AZ/JR4k/qZFnlH6VRsqvtDrbdYdXnd4cUhNto+KzAqT8T4lcjn/N4DpxVo44oXPLml5NAdpuKG+vdxVO2dfOnTKRnam+7LF9a7iVz013EqsMy53qPBNj9y8jr3cdRbnY6gHddHbtQAetnuDBkDwB4NHLVZvvyvjLdVaiy0VNeS3k2hidifck8Msv0jgEOr2gZLDJrW5NaNB9TzVXfiURkjRuRpE20hxltSoPddLumJXWuRsooFjRzeoFMyJWiPqhGcxeYz/8sv3Z9E0d/Dwv2X4PnPKjszafcyYHH/hvP+13HoVFwSVVFiFkuLpj5K1RtTJwQJgNRrx+iq+z1QXRBp9pnqHnwPlb3qzdotSlZiapilQUo96O8ZoD2qxUC9y7iXHtU8KgDLtmLTqnIai5zVQ9rseFwsQnYTZIRV/Ky+pVYxFUlLOFaxSIjYux5pU0uxyNdQug7CiBAjKOEAEK0y92RGSCcnAaubwB3Kt7OQyR1UUjmuDASHOIsAHNcN/OyuWKl7S1V/U3DM8zbLy+a3aWcpL0kl+5yeoYseOS1LbtVx/v/poe0fcVIwlpuPZfcBw6cuRWJrNkd3c96zCM/WIaf8qgDCHG18x8HA/JQraCQHMhtxv9qxvazfDen44TxurMmbJjz8uNfcbdVRjWRo63+iK17LXx+TXfMJOjpo2Z+07ic/Ibk0QXaBbE35ME1BPiyHpkQIHrm5tewAHmUb0ll7FrhuyIJ8cs0tNTMb/1HYcr21drlkM1zE1/rMJNsjcWPkpbI4RfKTGzgecIdh5OyJ8dLLsjCDb4JGZpIuNRkfkrKmrnEC9nDg4ZjjnqimUlGlaAYlwuTwDDq0jofqF9JSs/Li8bfJEXvXkRuukophA+SE4qBtPsfALt1wr4a24qEJ24KIcvmGyK6O+YRB+5FpRgUKI2KYa25FkJOk2CMXKSivI1B7IRy/JfRU6J6MTuXlpyuTZ9Dx49kFH2FXFBerD0Bx3FTbs13BAYJ7HkwzW3PGH/AFDMfMLSFllWxbIeSLA3BBHUaK8fGRYOFjZOxsy5krsqKmM3Qe4JVu6Mb1B9OnCCs9GRfRwmHxrmBEFGF7T2bPlw+arBMVp9qUNPMbySYZNMbDkerTl4iyp6rYUjQSwtlbrdntW5s18roQjtVCpO3YtFUc1ptjtJFyVj2ZFbDZFQCwAJOom4rg0aeKb5LVoCKEsNUw0qmKTkrY3JFRfARiaYlWpqNMFkwl63Zscubgb6XGRsmrLqtGbi7iyk8cMkdslaFNl7FgbI0BtySRd2eoNrbtbKl7U7GlEzn4SQ5wAIF8sPLhYrT077SMP7m/EKXaGMiK+d2vHzCfi1ElLc+THqNFjlDbDgw1PsprbuldgAFwNXH/T9UxT0cst+4YWMP5zqRzccm+CcMLHatB+fXimxI45E5DQbh4LVLWqvlRzodMk3874KNnZcknE9ozOpJNt17XTEXZvCDhe0nhmL+J8FcMRQk/GTvsjV+nY2qbf9lDLsGUDF3ZIORtmR1A81WRUbmOLSN69LoneqjOia72mg9QL+aZHXf9kIn0h18k/7POWLpN8l6C7ZULtYx4ZIDuztORYAjxTlr8f3McujZ74aZ59KwnPySxjIXpLezNPwPmuO7MU/A+anxuMtHpWpXt/Z5thTNPRvdYtaTbgFvR2Xp73s7piTv9PY1uGMYB+0kHzS8vUccIuQ3F0jPOVSaRgjsl9iQ0mxzABuBxtvT2zthOeRhxE2BdlkAdBfittsimcxxJc51+JJV21nAW6BIxdUWaG6CNH6GoSqcjBVXY55BILQd2evW2h5oOzdhGM3my4AEO87aLfyRE7lV1uy5H6DzVJ6vI4uPuasXTcEJqavgo6owxsLiCQOFln39rotGQ3O7E/5ALT13Y2aVuEy4b8FTs/Cc4gfSLW/audkjP8AwOi80ymPaqdxIDY2DdZpJ95W52dVtlibI0AEizgPyuGo+9yVi/DeO4Lpnm3AALQUPZ1kQIY52Y36XGhshghlTuZFO40+5VOdhzvmozTtcB+rhw5KO0oXMcWlLU7LG50962gZNwXAckaoZY5aHMIG9QoCkC5ZMNhLjYC5Tf8ASpP0+8I2A8RbRyXJmnbHyHrP8hl71bbIgje4BtRPkM3iNuHLeRe9lX02yrHFO7/xssTrvOg05q0lr7M7uNoYzgNTzc7UqyEFtV7Gp5QT39pN8mC1/wC5oOvNT2TssgepI2QaYvY8QHajmFlHVBebfl/+v4V7smIta6U7hZvU5BVnjjNUy8Mjg7RofQpRmAHD9rgfde6hFIrPs7TSgAueG34tBPvRtswxvfkHB+mINu1x/cBp1S1hUFSHes58yK9j03E9Dp9lynUEK9oOzziLn3qjZeitBUmxOOgWmi2HbgmWbLHFBt+EFJGVbQPPJW+06cSNLCD6xGm7O97q5Zs9oXSQ04SciRbx/m3mjG/IJU+xgdo7GMYuNFXxar1N9Kw6gFcZRRjRjR4BWRSUbPOmROOjSfArlSwxtxSeoNLuyz8dV6WIwNwXkn43QPZNTVOrA10YBbdjXXvc55kjdb8qEm64JGCvkJUdqGwsxMjMo4ghoy5lavYX/NQsnjsWPFxmDY72m28FeMTVL5m3foBq46cg3INC9B/BvtFGxhoZJP8Aid450It6paRctBAyN768UnDOUr3DsuOMao3bNlP3kIzdlne5Wa6niyvbswcSpjZzE6vlCCooY+Cm2mYPyhGXyBCAjHAKVl1cKiSXYh8uLq4USHy4V1cUAcKiVIqJRAIbWpMbb2zGfhwWefEeC15S1TSNdyPH6opkMsAbW8R80SlonPNh4ngrZmyjfMhPxxBos0ZfeaLZBeClawZDqd5RlGWQDUgdSh+ls/UFUNHgGLPzS0jy92EeyMzz4Dp9FGWXE4sGgN3H5IlKBa/E5D9u4eSaZR2jpwSFqIMNmMscPtOPTlqs/SGxCt3XdZovnv1V0A1OzaqN9xHi6nSw+ChWGSeURtkLIm2xYTYuO/NCpnNijwg7sz03BRpqkjqSoWNRRsjjFmCwGpOZPiUSTazwWsj9Z7/Ybfdvc87mhUvpgAJJyaLnwVj2djOEzv8AblsR+2P8jPn4pM3Q7HHcX0EsobZzw5284bDwF9FIVMn7T4FL96ud4b8kmzTtHBWne3yKXfJE54e5rg4acMuWl8yhukIvp/CjrmUeQbEWbK2M/mCO14OhHmqCSnB1CVqGNjzzGpyJ3ZlDcybPuatYb8Y6CSXZzu7jY8xvEri4AujY1rsT47/m0HQlPx7SlAFi7PRrhmVWdqO1pp4XtlDSXtLcOt8QsRmOavFN9kLnUKUn3PKOyWw3zes9pIO8m5PhmSFd00L6KrjqWgHunjFGLA92bhwGetibc7JTZ3ad/sNAijuLtYDd39zr3d5gKzqtpROBB36nS44Ll5NR6c7im/wdGOH1IbW0vyes9nu0dPWNLoXG7bY2OBa9t9Lg7uYyyVm2oYThDhfhfNeJbJrm0UnpMJuxze7cL/leRv5GxW6L3vsQbDdYXPW+gXX0sVnhvXBx9Zlennsat9/4Nuuqk2RtX/tymxAycbAO5HmrdszTo4eYQnBwdMviyxyRuJNfL5fKow+XCurihD5cXVxQh8uFfLhUAfFRK+c4cUJ9SwauHmoCgiiSln7QZuN+iSnqHO5Dh9VLLKLG565oyHrH3eaQnrHnfbp9UGR4AVZV1llVyGRxh5p7b0L0kcVS1W0Ep6eqbx3pnmNEMnfuOEfM/f8AmziG4fx4JaJgxAD8t/AnL6/ep2usTfh5+G5a0ctj8T7Wvx8Va0VWGnMZnLn/ACs+1/3r79ybgltvt71aypfS1RJABGZ4uR4arPXTqqWKXPQcs05C+2ZGmftKNhRcsJeY4dcZxPP7G5kZ8cgtkJtyxXZoFz3ynkxu/Ia+/wCC1UZWKc7kdLFDbEc1N8/AkfBMRxc3f7igQBNxO5bvM/JRNlmRliBIbn+o+sd2m/j8ETD+4+4/JCieDd3E5dBkPgiY1dvwVJgO4jy/lQkBOuE9QV3vECqk9W36vV89fdcoJkQOnN7yOty/tGnnr4rzH8SXF4dxb63zXpkjXOYQ12EcRr78l5t22o3tDiXYwQc7WOnJdXTwSg19jznUM0pZItdkzz/ZtcBYHpf4LTus5oPFefA2Nlsth1WKMAnMBcLPi2vcj0+kzuS2yOz37qRl7eqT4jMHzC9F7Fba72BhJucIXn9WwWPMZovY6d8Re0G7WnH0adT0utnTcsdzg/P5Od1nBPassFe38HrdRTtLb2JO4XzJ+QUBBKG5yG+gAFxf/V8VzY1VjaCrMM3rpZF/jJHIwvtkg6KzFO38w8gPgiM2pUDLF53+qsWgbwhvjBWOWmT+l0dKGta+tWBbtue3sjqL3RG7ZnG6/j/CHgA3KbWNKzTw5Im3FqMOTsMN23JvaPA/wpHbEn6R5oIYFIAJdy9x+2HsfHaUvAef0XPSZHa2HQfVSNlAy8FOSVHwjjwTqSfFREY4LheuF+SJArWocswCFjJCSqQQo3QVGwNfXEKgqa8p+t0VFUtS3IfGKSAz1BO9R71KzkqOIqJkaM5QknvCf1fBGk1B+/FK0T7M9bIkuOh+KMx9224ffitxxArD97keMn/GiWDvv+ERpv8AdvciAep5P7Uy+QkWGG5I056Kvjfz/wDVWmyY8T7nRunVLySpDsMN0qNfsOAMYBwCvYiqKlksrGGoCxpnTaLeJyhLXtbcG4sL5jI9ClGzImO/395K8ZLyV2jNO+zG/wBo+Cl3yU7xR7xTcDaMvrWi+J1rWBvxO5dM4LwODS7xOTfdiSZkH30shwnCBvOENJ3m3FXUkBxLSCoAZcrM9poDI02Y4ocswMpDrkA+q0Gw6kq5pnC2VvDTzOq7kY7Kl7nj55PX3Q7Uz87bZpsEhFrWJHvRdk1Za4L2btN2YpKoXeLSbnsBv4jevMtp9hqyAlzGGWMZhwFnW5tKw5tPJ8pWjqafVxVRbpj5fdpH3xCn2ZrO7qGuObfZeNxa7Ig+fuVY2dwtdpBtYggixCnsGgqJ5C2KJz9xIFmjq45LlxwTUuEd2WpxOPLVHsux6IRuIYfUOYH6eQ5K7CR2LRujiY2QgvDQHEaXAGice8Lsxcmlu7nnZqEZPZ2PnFQc9BfMgOnTVAyyyDDnIRdbRBdOhOqAr7Bfq1zY62o4ohqWhVgqAiB4KzZdKnzE6Gm6jXE+UNSVBKhiPFCBXTKAudKEoumdrHkjNXFhcbkWyWbOMvNT9JHlmqjUmxvIBKzEFCkq7pSaqVWy8YnauFpCqaihG5PGQlRxpfcZyihn2Yh/0wrROjX3dBSibjyCN1st181JrdbWB4WutRtT8P6qFjpLseG3JAyNuSy7Pu63nFJ4ra7/AHFFjd9/yoEfZzHgusZncZfevNQA1GHEhrQ5zibADMknkF6F2d7E1BaC+0Y1zzdnyVB+GcrW1by8BxayzctCTmeui9dj2m07lSUdxoxycOxWQdkWAZyOPkELamwhEwva4m24q+ZVl2QCI+mDhZ2YO5VeNUMWWXuYFk6KKjmtrFsiBukbfJDrNkwuafUAy1AsUr0mP9dGQ9JUjMEnLGQ/DzsFoKHs05wBecN9w1VEmxkpRStlR3yi6XmtbF2ZgGZFzpclSm7OwEaW6EpixsU8yPOtqx2c11/aGY6KcdXcYbnmSbNA6DVM9q6LunhgN8suKoMRFl6TCrxx/Y8Dq246mde5qYajC0YBcnQnU9AnG02WKR7ieANmjkAFntn1WHPVx3ncOAVkdoC4z005c1WUHfA7Hng4/N/RaCnjGrG+IufFHgka3QBvIAD4Khk2mNdeXNCbtP6lD0pPuW+MxxdI076lJzVYVHJtNKS1hKkcFFMnUE1wW81cBvSkm0VUulQzKnrGkYpajJLsWrtooTq0lVhkX3eq21C3LI/JZtqzknqWpvbxKz7ZdOiYiqLeSDimGGScGaaGcWHS6I9rXarOx1ZFulk2yt1JSJ4E+5vw9Q29nRZtpL5hxSskbmki90zTS2bcqsmnkkd6twOKzPRY5eKOl+s5caTu/sTkL+BQvX4FMNpH/meeiba8AWSJdPh4Zrh13I/qgl/IgJL65IrZQuyuzQ7NKVLp8l2Zph1vG3UkEkqAuekDklJYAdCQh9wP1JL0eX2NK6np2vqL6v2iXgt3G4XjW0x3cz2fuNuhK9M7zNZztb2LMkb6tkhDgLlm4j6pjQnuZJkgCiNpR5+sDb7sq11A9wzJPius2QeCW2WSRruxFW1tQ0fquvV6V682/CqihjqHulF3YAIycw3M3twOi9OigBdkQjFcF5O2PwSkZhPR1LuC+gpgAiBijCiXeOQnOO9MYwEtJJc5IBszEtm1gB43Hktg2qCz3aHZ7CzvhlIwgi2/PRPxOyHRVUasvKaaRZmqCDJUlLBy+JVqKWZrtc25ad+g58lkZrk55Hgt12k2E6riLGSd24Ztda+Y48lgaATgmKpALmmwkaNbfq+q36XUbfkkcHqfT3kfq4+/lBmKD5rJ/uARZVc8ZBzXSUrPPvE49yRmK6JksQuXVrDsQ0ZlAyJbEvi5SyLGgxeo40EuXLqFlFBsa+Ds0G6605oFqJh+nQqbZM/BLA/EroOalkcR5kiPFOALnNVokRC9GxTxj76+Qm5JR4dquGRVYH6Lr5AdFKROb4LebaROmSD6Y471Wd4u97ZSkBxk/JYPnJ1K+FWGiwVWJCVIPzQdBUHF3ZYPq7NPE5eajgKq6mf12t8Srjv1zNZqXjntiej6VoY5cO/L/AxDUsBuV3aNd3kZZo22irj9URZLOlZTQ7Iun4diDgrSBWESqWRXUWyQ03GSeptolkgbYnmNFYN0PRUmz/aP9xUQWayDbg0JTzNo4tCsRP7autmoF7NB3pKm11kCJNxokPoGF59YZc0xJS8ExEiKrZZIq3sIUbJmp1QUQEb2CW/prTnbVMFNDRQhQV+wgRePI7xuKx+16UtdmCDzXppWU7aat+9y3aTLJy2s4nVdNBY3NdzDvCimXqK6VnBj2FyFApgqKllwFlEhMLvBGyULL5HK4EAgDr719vTDtfBR3jxUCgAXb5oq+3qJkaOY8kMvRtyE5RskYo4HL5xU2qQQsLRHvQEuZblFeob0GyyghaB95CeGSue9VTS6u6qzXA1TvKz1+gW3BFI//9k='
}, {
  id: 'ssa9d789as7',
  user: 'some_id_2',
  category: 'Dermatologists',
  title: 'Dermatologists',
  description: 'Have problems with your skin, hair, nails? Do you have moles, scars, acne, or skin allergies? Dermatologists can help.',
  price: 10, //per hour
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSa5JTnygEJcsV-oQfpF-CC3mdtG2d6-Z7aWw&usqp=CAU',

}, {
    id: 'ssa9d789as7',
    user: 'some_id_2',
    category: 'Family Physicians',
    title: 'Family Physicians',
    description: 'They care for the whole family, including children, adults, and the elderly. They do routine checkups and screening tests, give you flu and immunization shots, and manage diabetes and other ongoing medical conditions.',
    price: 10, //per hour
    image: 'https://www.medicalwesthospital.org/tyfoon/site/fckeditor/image/family%20physician.jpg',
}]




// export const fetchServices = () => {

//   db.collection('services')
//     .get()
//     .then(snapshot => {
//       snapshot.docs.forEach((doc) => {
//         debugger
//         const service = doc.data()
//         console.log(service)
//       })
//     })

//   return {
//     type: FETCH_SERVICES,
//     services
//   }
// }