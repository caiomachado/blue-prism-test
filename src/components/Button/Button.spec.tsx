import { render } from '@testing-library/react'
import { Button } from './index'
import { theme } from '../../utils'

describe('Button Component', () => {
    it('should render properly', () => {
        const { getByText } = render(
            <Button
                type='button'
                variant="primary"
                mainColor={theme.palette.blue}
                subColor={theme.palette.white}
                handleClick={() => {}}
                text="Add Entry"
            />
        )

        const button = getByText('Add Entry')
        expect(button).toBeInTheDocument() 
    })
})