import PropTypes from 'prop-types';

import Module1 from '../pages/Modules/Module1';
import Module2 from '../pages/Modules/Module2';
import Module3 from '../pages/Modules/Module3';
import Module4 from '../pages/Modules/Module4';
import Module5 from '../pages/Modules/Module5';
import Module6 from '../pages/Modules/Module6';
import Module7 from '../pages/Modules/Module7';
import Module8 from '../pages/Modules/Module8';
import Module9 from '../pages/Modules/Module9';
import Module10 from '../pages/Modules/Module10';

function ModuleSwitch({ moduleId }) {
  switch (moduleId) {
    case 1:
      return <Module1 />;
    case 2:
      return <Module2 />;
    case 3:
      return <Module3 />;
    case 4:
      return <Module4 />;
    case 5:
      return <Module5 />;
    case 6:
      return <Module6 />;
    case 7:
      return <Module7 />;
    case 8:
      return <Module8 />;
    case 9:
      return <Module9 />;
    case 10:
      return <Module10 />;
    default:
      return null;
  }
}

ModuleSwitch.propTypes = {
  moduleId: PropTypes.number.isRequired,
};

export default ModuleSwitch;
