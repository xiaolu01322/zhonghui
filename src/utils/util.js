export default {
    setCookie(name, value, iDay = 1000 * 60 * 60 * 24, path = '/') {
        // 有过期时间
        if (iDay) {
            const oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + value + '; path=' + path + '; expires=' + oDate.toUTCString();
            // 没有过期时间
        } else {
            document.cookie = name + '=' + value + '; path=' + path;
        }
    },
    getCookie(name) {

        let arr, reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);

        console.log(name)
            console.log(document.cookie)
            if (arr = document.cookie.match(reg)) {
                return decodeURIComponent(arr[2]);
            }
        return null;
    },

    delCookie(name) {
        const cval = getCookie(name);
        if (cval !== null)
            setCookie(name, '', -1);
    },
    inArray(v, arr) {
        let i;
        for(i in arr) {
            if(arr[i] == v) {
                return true;
            }
        }
        return false;
    },
    canTurnTo(name, user, routes) {
        if(user.operatorId > 0) {
            const routePermissionJudge = (list) => {
                return list.some(item => {
                    if (item.children && item.children.length) {
                        return routePermissionJudge(item.children)
                    } else if (item.name === name) {
                        if (item.meta && item.meta.access) {
                            return item.meta.access.indexOf('visitor') < 0
                        } else {
                            return true
                        }
                    }
                })
            }

            return routePermissionJudge(routes)
        } else {
            return true;
        }
    },
}
