import People from '../components/People'
import withBreadCrumb from 'hocs/withBreadCrumb'
import withHelpers from 'hocs/withHelpers'

export default withHelpers(withBreadCrumb(People))
