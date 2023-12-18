import { refreshToken } from "../../utils/auth";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            refreshToken()
              .then((res) => {
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", res.accessToken);
              })
              .then(() => {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
              });
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        if (wsSendMessage && type === wsSendMessage.type) {
          setTimeout(socket.send(JSON.stringify(action.payload), 1000));
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
