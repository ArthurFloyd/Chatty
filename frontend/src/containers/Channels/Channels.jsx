import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalState, setChannels } from '../../store/slices/app.js';
import RemovableChannel from './RemovableChannel.jsx';
import NonRemovableChannel from '../../components/NonRemovableChannel.jsx';
// import addChannelImg from '../../assets/addChannelButton.png';

const Channels = ({ channels }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getChannelNames = (fethchChannels) => fethchChannels?.map(({ name }) => name) ?? [];

  useEffect(() => {
    if (channels) {
      const cNames = getChannelNames(channels);
      dispatch(setChannels(cNames));
    }
  }, [channels, dispatch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('homePage.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(changeModalState({ isModalOpened: true, modalType: 'adding' }))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => (channel.removable
          ? <RemovableChannel channel={channel} key={channel.id} />
          : <NonRemovableChannel channel={channel} key={channel.id} />))}
      </ul>
    </div>
  );
};

export default Channels;
