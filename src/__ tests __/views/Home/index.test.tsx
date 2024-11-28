import { render } from '@testing-library/react';
import Home from '../../../views/Home';

jest.mock('../../../components/AccessForm', () => () => <>Cmp AccessForm</>);

describe('Home component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Renders correctly', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
