import Room from '../components/Room'
import withBreadCrumb from 'hocs/withBreadCrumb'
import withToggleModal from 'hocs/withToggleModal'

export default withBreadCrumb(withToggleModal(Room))
