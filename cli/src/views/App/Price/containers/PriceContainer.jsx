import Price from '../components/Price'
import withBreadCrumb from 'hocs/withBreadCrumb'
import withHelpers from 'hocs/withHelpers'

export default withHelpers(withBreadCrumb(Price))
