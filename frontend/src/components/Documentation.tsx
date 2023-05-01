import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import { LoadingOutlined } from '@ant-design/icons';
import swaggerJson from '../../public/docs/main.json';
import 'swagger-ui-react/swagger-ui.css';

type Props = {};

// Create a new component using the SwaggerUI component where render the documentation in the url ./main.json
const Documentation = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section className="documentation">
      {isLoading ? <LoadingOutlined className="loading-docs" /> : <SwaggerUI spec={swaggerJson} />}
    </section>
  );
};

Documentation.unstable_disableLegacyContext = true;

export default Documentation;
