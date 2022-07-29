/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import React, { useEffect } from "react";
import moment from "moment";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "@Server/i18n";
import { handleLogout } from "./helper";
import { LOCAL_HOST_KEY } from "./enums";

interface Props extends WithTranslation {
    onActive: any;
    onIdle: any;
}

const IdleTimeOutHandler: NextPage<Props> = ({ onActive, onIdle, t }: Props) => {
    let timer: any;
    const router = useRouter();
    const { AUTH_TOKEN } = LOCAL_HOST_KEY;
    const token = Cookie.get(AUTH_TOKEN);
    const events = ["click", "scroll", "load", "keydown", "mousemove", "mousedown"];
    const timeOutInterval = Number(Cookie.get("idleTime"));

    const startTimer = () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            const lastInteractionTime = localStorage.getItem("lastInteractionTime");
            const diff: any = moment.duration(moment().diff(moment(lastInteractionTime)));
            const timeoutInterval = timeOutInterval;

            if (diff._milliseconds <= timeoutInterval) {
                startTimer();
                onActive();
            } else {
                onIdle();
                clearTimeout(timer);
                if (token) {
                    Cookie.remove("idleTime");
                    localStorage.removeItem("lastInteractionTime");
                    handleLogout(t, router);
                }
            }
        }, timeOutInterval);
    };

    const eventHandler = () => {
        localStorage.setItem("lastInteractionTime", moment().toString());
        if (timer) {
            onActive();
            startTimer();
        }
    };

    const addEvents = () => {
        events.forEach(eventName => {
            window.addEventListener(eventName, eventHandler);
        });
        startTimer();
    };

    const removeEvents = () => {
        events.forEach(eventName => {
            window.removeEventListener(eventName, eventHandler);
        });
    };

    useEffect(() => {
        localStorage.setItem("lastInteractionTime", moment().toString());
        addEvents();
        return () => {
            removeEvents();
        };
    }, []);

    return <div />;
};

export default withTranslation()(IdleTimeOutHandler);
