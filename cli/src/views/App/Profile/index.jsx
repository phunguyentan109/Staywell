import React, {useCallback, useState, useEffect} from "react";
import {Col, Row, Card, Form, Input, Button, Spin} from "antd";
import About from "components/profile/About/index";
import Contact from "components/profile/Contact/index";
import Auxiliary from "util/Auxiliary";
import ProfileHeader from "components/profile/ProfileHeader";
import api, {apiCall} from "constants/api";
import withNoti from "hocs/withNoti";
import {connect} from "react-redux";
import moment from "moment";
import * as credentials from "constants/credentialControl";
import {sendReloadUser} from "appRedux/actions/user";

const FormItem = Form.Item;

const DEFAULT_PASSWORD = {
    current: "",
    change: "",
    confirm: ""
}

const DEFAULT_PROFILE = {
    email: "",
    job: "",
    phone:"",
    birthDate: moment()
}

function Profile({notify, user, role, sendReloadUser, ...props}) {
    const [password, setPassword] = useState(DEFAULT_PASSWORD);
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        setProfile(user);
        setLoading(false);
    }, [])

    useEffect(() => {
        load();
    }, [load])

    async function changePassword() {
        setLoading(true);
        if(password.change === password.confirm) {
            try {
                await apiCall(...api.user.changePassword(user._id), password);
                setPassword(DEFAULT_PASSWORD);
                notify("success", "Process is completed!", "Your password has been changed successfully.");
            } catch (e) {
                notify("error", "The process is not completed", e);
            }
        } else {
            notify("error", "The process is not completed", "Please ensure that all your entered data are valid.");
        }
        return setLoading(false);
    }

    function hdChangePassword(e) {
        const {name, value} = e.target;
        setPassword(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function getRoleName() {
        let roleName = "";
        if(role.isOwner) roleName = "Owner";
        if(role.isPeople) roleName = "People";
        return `${roleName} at StayWell`;
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setProfile(prev => ({...prev, [name]: value}))
    }

    async function hdUpdateProfile(profile) {
        setLoading(true);
        try {
            await apiCall(...api.user.update(user._id), profile);
            sendReloadUser(user._id);
            setProfile(DEFAULT_PROFILE);
            notify("success", "Process is completed!", "Your profile has been updated successfully.");
        } catch (err){
            notify("error", "Process is not completed", "Profile data is not updated successfully")
        }
        setLoading(false);
    }

    return (
        <Auxiliary>
            <ProfileHeader
                username={user.username}
                avatar={user.avatar.link}
                role = {getRoleName()}
            />
            <div className="gx-profile-content">
                <Row>
                    <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                        <About
                            job={user.job}
                            birthDate={user.birthDate}
                        />
                        <Card className="gx-card" title="Change your profile">
                            <Spin spinning={loading}>
                                <Form layout="horizontal">
                                    <FormItem
                                        label="Your email"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 16}}
                                    >
                                        <Input
                                            type="email"
                                            placeholder="Enter your email here..."
                                            name="email"
                                            value={profile.email}
                                            onChange={hdChange}
                                            disabled={role.isOwner ? profile.email : ""}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Your job"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 16}}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Enter your job here..."
                                            name="job"
                                            value={profile.job}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Your Phone"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 16}}
                                    >
                                        <Input
                                            type="phone"
                                            placeholder="Enter your phone here..."
                                            name="phone"
                                            value={profile.phone}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Your birthdate"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 16}}
                                    >
                                        <Input
                                            type="date"
                                            placeholder="Enter your birthdate here..."
                                            name="birthDate"
                                            value={profile.birthDate}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                    <FormItem
                                        wrapperCol={{
                                            xs: 24,
                                            sm: {span: 14, offset: 6}
                                        }}
                                    >
                                        <Button type="primary" onClick={() => hdUpdateProfile(profile)}>Save changes</Button>
                                    </FormItem>
                                </Form>
                            </Spin>
                        </Card>
                    </Col>
                    <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                        <Contact
                            email={user.email}
                            phone={user.phone}
                        />
                        <Card className="gx-card" title="Change your password">
                            <Spin spinning={loading}>
                                <Form layout="horizontal">
                                    <FormItem
                                        label="Current Password"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 22}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Enter the current password here..."
                                            name="current"
                                            value={password.current}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="New Password"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 22}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Enter the new password here..."
                                            name="change"
                                            value={password.change}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm New Password"
                                        labelCol={{xs: 24, sm: 10}}
                                        wrapperCol={{xs: 24, sm: 22}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password here..."
                                            name="confirm"
                                            value={password.confirm}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        wrapperCol={{
                                            xs: 24,
                                            sm: {span: 14, offset: 6}
                                        }}
                                    >
                                        <Button type="primary" onClick={changePassword}>Save changes</Button>
                                    </FormItem>
                                </Form>
                            </Spin>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Auxiliary>
    );
}

function mapState({user}) {
    const {role} = user.data;
    const {isPermit} = credentials;
    return {
        user: user.data,
        role: {
            isOwner: isPermit(role)(credentials.OWNER_PERMISSION),
            isPeople: isPermit(role)(credentials.PEOPLE_PERMISSION)
        }
    }
}

export default connect(mapState, {sendReloadUser})(withNoti(Profile));
