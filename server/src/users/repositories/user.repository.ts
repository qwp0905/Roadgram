import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "../dto/createUser.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt'
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "../dto/updateUser.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getUserInfo(userId: number) {
    const userInfo = await this.find({id: userId});
    return userInfo[0];
  }

    async createUser(createUserDto: CreateUserDto) {
        const { email, password, nickname } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ email, password: hashedPassword, nickname, login_method: 0 });

        try {
            await this.save(user);
            return { message: "signup succeed" }
        } catch {
            throw new InternalServerErrorException();
        }
    }
    async deleteUser(id: number) {
        try {
            await this.delete({ id })
            return { message: 'withdrawal succeed' }
        } catch {
            throw new NotFoundException('not found')
        }
    }

    async updateUser(userData: UpdateUserDto) {
        const user: User = await this.findOne({ id: userData.id, login_method: userData.loginMethod });

        if (!user) {
            throw new BadRequestException('bad request');
        }

        if (userData.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            user.password = hashedPassword;
        }

        if (userData.nickname) user.nickname = userData.nickname;

        if (userData.profileImage) user.profile_image = userData.profileImage;

        if (userData.statusMessage) user.status_message = userData.statusMessage;

        this.save(user);
        return { 
            data:{
                userInfo:{
                    statusMessage:user.status_message,
                    profileImage:user.profile_image
                }
            },
            message: 'change succeed'
        }
    }
}