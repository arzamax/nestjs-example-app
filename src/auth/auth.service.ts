import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { UserRepository } from './user.repository'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { IJwtPayload } from './models/jwt-payload.interface'

@Injectable()
export class AuthService {
  private logger = new Logger()

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )

    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: IJwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    this.logger.debug(`Generated JWT Token. Payload ${JSON.stringify(payload)}.`)

    return { accessToken }
  }
}
