import React, { useState, useEffect } from "react";
import { MOBILE_SIZE, DESKTOP_SIZE } from "constants/variables";
import { notification } from "antd";

const DEFAULT_DESC = "There may be some errors occuring in the process. Please wait and try again later.";

export default function withHelpers(WrappedComponent) {
    function Helpers({ ...props }) {
        const [device, setDevice] = useState({
            isMobile: false,
            isTablet: false,
            isDesktop: true
        });
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            hdResize();
            window.addEventListener("resize", hdResize);
            return () => window.removeEventListener("resize", hdResize);
        }, []);

        function hdResize() {
            let isMobile = window.innerWidth < MOBILE_SIZE;
            let isTablet = window.innerWidth >= MOBILE_SIZE && window.innerWidth < DESKTOP_SIZE;
            let isDesktop = window.innerWidth >= DESKTOP_SIZE;
            setDevice({ isMobile, isTablet, isDesktop });
        }

        const openNotificationWithIcon = (type, message, description=DEFAULT_DESC) => {
            notification[type]({ message, description });
        };

        return <WrappedComponent
            device={{ ...device }}
            notify={openNotificationWithIcon}
            loading={loading}
            setLoading={setLoading}
            {...props}
        />
    }

    return Helpers;
}
