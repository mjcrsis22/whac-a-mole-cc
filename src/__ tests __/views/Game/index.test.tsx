import { render } from '@testing-library/react';
import Game from '../../../views/Game';

jest.mock('../../../components/UserPanel', () => () => <>Cmp UserPanel</>);

describe('Game component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Renders correctly', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });
});
