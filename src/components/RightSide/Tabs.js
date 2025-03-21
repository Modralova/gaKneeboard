import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Route from '@components/RightSide/Tabs/Route/Route';
import Logbook from '@components/RightSide/Tabs/Logbook/Logbook';
import GUI from '@components/RightSide/Tabs/Route/GUI/GUI';

function CustomTabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index

        && (
          <Box sx={{ p: 0, heigth: 800}}>
            {children}
          </Box>
        )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RightSide() {
  const [t, i18n] = useTranslation('global');

  const routeState = useSelector((state) => state.routeReducer).route;
  const logbookTimesState = useSelector((state) => state.expaReducer);

  const total = routeState.reduce((total, slice) => ({
    time: total.time += slice.sec, distance: total.distance += parseInt(slice.s, 10),
  }), { time: 0, distance: 0 });

  const date = new Date(0);

  date.setSeconds(total.time);

  const time = date.toISOString().substring(11, 19);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box
      className="rightSide"
      sx={{ py: 2, width: '90%', mx: 'auto' }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="rightSide"
          textColor="secondary"
          indicatorColor="secondary"
        >

          <Tab label={t('tabs.rightTabLabels.ROUTE')} />
          <Tab label={t('tabs.rightTabLabels.LOAD')} />
          <Tab label={t('tabs.rightTabLabels.LOGBOOK')} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GUI />
        <Box sx={{ pt: 5, ml: 0 }}>

          <span style={{
            display: 'flex', flexDirection: 'row', padding: '0px 30px 0px 30px', justifyContent: 'space-between', fontSize: 12,
          }}
          >
            <Typography variant="c3" component="p">total distance: </Typography>
            <Typography id="AP" variant="c1" component="p">
              {total.distance}
              nm
              {' '}
            </Typography>
          </span>
          <span style={{
            display: 'flex', flexDirection: 'row', padding: '0px 30px 0px 30px', justifyContent: 'space-between', fontSize: 12,
          }}
          >
            <Typography variant="c3" component="p">total time: </Typography>
            <Typography id="AP" variant="c1" component="p">
              {time}
            </Typography>
          </span>

        </Box>

        <Route />

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} />
      <CustomTabPanel value={value} index={2}>

        <Box sx={{ p: 3 }}>

          <span style={{
            display: 'flex', flexDirection: 'row', padding: '0px 30px 0px 30px', justifyContent: 'space-between', fontSize: 12,
          }}
          >
            <Typography variant="c3" component="p">total air time: </Typography>
            <Typography id="AP" variant="c1" component="p">
              {logbookTimesState.airTime}
            </Typography>
          </span>

          <span style={{
            display: 'flex', flexDirection: 'row', padding: '0px 30px 0px 30px', justifyContent: 'space-between', fontSize: 12,
          }}
          >
            <Typography variant="c3" component="p">total taxi time: </Typography>
            <Typography id="AP" variant="c1" component="p">
              {logbookTimesState.taxiTime}
            </Typography>
          </span>

          <span style={{
            display: 'flex', flexDirection: 'row', padding: '0px 30px 0px 30px', justifyContent: 'space-between', fontSize: 12,
          }}
          >
            <Typography variant="c3" component="p">total block time: </Typography>
            <Typography id="AP" variant="c1" component="p">
              {logbookTimesState.blockTime}
            </Typography>
          </span>

        </Box>

        <Logbook />

      </CustomTabPanel>

    </Box>
  );
}
