import { render } from '@testing-library/react';
import AppRouter from '../../../components/AppRouter';

jest.mock('../../../views/Home', () => () => <>View Home</>);
jest.mock('../../../views/Game', () => () => <>View Game</>);

describe('AppRouter component', () => {
  test('Renders correctly', () => {
    const { container } = render(<AppRouter />);
    expect(container).toMatchSnapshot();
  });
});
