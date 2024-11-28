import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';

jest.mock('../components/App', () => () => <div>Cmp App</div>);

describe('Application root', () => {
  test('Renders correctly', async () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    await act(() => {
      require('../main');
    });

    const component = await screen.findByText('Cmp App');
    expect(component).toBeInTheDocument();
  });
});
