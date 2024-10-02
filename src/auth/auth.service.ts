import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  username: string;
  password: string;
  role?: string;
  isActive?: boolean;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode pour signer un utilisateur
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    // Validation de base sur les entrées
    if (!username || !pass) {
      this.logger.warn(
        'Tentative de connexion sans nom d’utilisateur ou mot de passe',
      );
      throw new BadRequestException('Username and password must be provided');
    }

    // Recherche de l'utilisateur
    const user: User | undefined = await this.usersService.findOne(username);

    if (!user) {
      this.logger.warn(
        `Échec de la connexion : utilisateur ${username} non trouvé`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérification si l'utilisateur est actif
    if (!user.isActive) {
      this.logger.warn(
        `Tentative de connexion avec un compte inactif : ${username}`,
      );
      throw new ForbiddenException('User account is not active');
    }

    // Comparaison du mot de passe haché
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      this.logger.warn(
        `Échec de la connexion : mot de passe incorrect pour ${username}`,
      );
      throw new UnauthorizedException('Password does not match');
    }

    // Génération du token d'accès
    const accessToken = await this.generateToken(user);

    this.logger.log(`Connexion réussie pour l'utilisateur ${username}`);
    return { access_token: accessToken };
  }

  // Méthode dédiée pour générer le JWT
  private async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, role: user.role }; // Ajout de l'ID utilisateur
    return this.jwtService.signAsync(payload, { expiresIn: '1h' }); // Ajout d'une expiration de 1h
  }
}
