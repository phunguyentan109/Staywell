import React from "react";
import {Col, Row, Tabs} from "antd";
import Widget from "components/Widget";
import AboutItem from "./AboutItem";
import moment from "moment";

const TabPane = Tabs.TabPane;

const About = ({job, birthDate}) => (
  <Widget title="About" styleName="gx-card-tabs gx-card-tabs-right gx-card-profile">
    <Tabs defaultActiveKey="1">
      <TabPane tab="Overview" key="1">
        <div className="gx-mb-2">
          <Row>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <AboutItem 
                title="Job"
                icon="company"
                desc={job ? job : "Developer"}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <AboutItem 
                title="Birthday"
                icon="birthday-new"
                desc={birthDate ? moment(birthDate).format("MMMM Do YYYY") : "Oct 25, 1984"}
              />
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
  </Widget>
);



export default About;
