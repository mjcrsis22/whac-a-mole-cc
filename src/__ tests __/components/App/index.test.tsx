import { render } from '@testing-library/react';
import App from '../../../components/App';

jest.mock('../../../components/AppRouter', () => () => <>Cmp AppRouter</>);
jest.mock('../../../components/PWABadge', () => () => <>Cmp PWABadge</>);

describe('App component', () => {
  test('Renders correctly', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
