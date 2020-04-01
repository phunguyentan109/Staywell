import Room from '../components/Room'
import withHelpers from "hocs/withHelpers";
import withBreadCrumb from "hocs/withBreadCrumb" ;

export default withBreadCrumb(withHelpers(Room));
