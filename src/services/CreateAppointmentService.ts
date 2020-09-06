import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentModel from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestAppointment {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: RequestAppointment): Promise<AppointmentModel> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const objAppointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(objAppointment);

        return objAppointment;
    }
}

export default CreateAppointmentService;
