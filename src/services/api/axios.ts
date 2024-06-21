import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setHeader = (token: string | null) => {
    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete instance.defaults.headers.common["Authorization"];
    }
}

setHeader(localStorage.getItem('accessToken'));

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config
        const msg = error.response.data;
        const status = error.response.status
        console.log(msg)
        if (status === 401) {
            if (msg == "사용자 검증에 실패했습니다.") {

                instance.post("/auth/refresh", { token: localStorage.getItem('refreshToken') })
                    .then((res) => {
                        if (res.data.reAuthenticationRequired) {
                            throw new Error("토큰 재발급 실패");
                        } else {
                            console.log("재발급 성공!");
                            const newAccessToken: string = res.data.accessToken
                            localStorage.setItem('accessToken', newAccessToken)
                            setHeader(newAccessToken)
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originalRequest);
                        }
                    })
                    .catch((err) => {
                        instance.post("/members/logout", { token: localStorage.getItem('refreshToken') })
                            .then(() => {
                                alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.")
                                localStorage.clear();
                                window.location.replace('/login');
                            })
                    })
            }
        }
        return Promise.reject(error);
    },
);

export default instance;
