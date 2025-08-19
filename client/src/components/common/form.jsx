import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled, }) => {
    const renderInputByComponentType = (controlItem) => {
        let element = null;
        const value = formData[controlItem.name] || '';
        switch (controlItem.componentType) {
            case 'input':
                element = <Input
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    id={controlItem.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
                />
                break;
            case 'textarea':
                element = <Textarea
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    id={controlItem.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
                />
                break;
            case 'select':
                element =
                    <Select
                        value={value}
                        onValueChange={(e) => setFormData({ ...formData, [controlItem.name]: e })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent >
                            {
                                controlItem.options && controlItem.options.length > 0 ? controlItem.options.map(optionItem =>
                                    <SelectItem value={optionItem.id} key={optionItem.id}>
                                        {optionItem.id}
                                    </SelectItem>)
                                    :
                                    null
                            }
                        </SelectContent>
                    </Select>
                break;
            default:
                element = <Input
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    id={controlItem.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
                />
        }
        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {formControls.map(controlItem =>
                    <div className='grid w-full gap-1.5' key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputByComponentType(controlItem)}
                    </div>)}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-5 w-full">{buttonText}</Button>
        </form>
    )
}

export default CommonForm