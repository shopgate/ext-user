import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_GET_ADDRESS_FIELDS } from '@shopgate/user/constants/Pipelines';
import {
  getAddressFields,
  getAddressFieldsSuccess,
  getAddressFieldsFailed
} from '@shopgate/user/action-creators';

export default () => async (dispatch) => {
  dispatch(getAddressFields());

  try {
    const { addressFields } = await new PipelineRequest(PIPELINE_GET_ADDRESS_FIELDS)
      .setTrusted()
      .dispatch();

    dispatch(getAddressFieldsSuccess(addressFields))
  } catch (err) {
    dispatch(getAddressFieldsFailed(err))
  }
};