import { EntityRepository, Repository } from 'typeorm';

import AppointmentModel from '../models/Appointment';

@EntityRepository(AppointmentModel)
class AppointmentRepository extends Repository<AppointmentModel> {
    public async findByDate(date: Date): Promise<AppointmentModel | null> {
        const findAppointment = await this.findOne({
            where: { date }
        });
        
        return findAppointment || null;
    }
}

export default AppointmentRepository;
