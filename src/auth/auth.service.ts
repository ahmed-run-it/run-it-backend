import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode pour signer un utilisateur
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // Validation de base sur les entrées
    if (!email || !pass) {
      this.logger.warn(
        'Tentative de connexion sans nom d’utilisateur ou mot de passe',
      );
      throw new BadRequestException('Username and password must be provided');
    }

    // Recherche de l'utilisateur
    const user: User | undefined = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.warn(
        `Échec de la connexion : utilisateur ${email} non trouvé`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérification si l'utilisateur est actif
    if (!user.isActive) {
      this.logger.warn(
        `Tentative de connexion avec un compte inactif : ${email}`,
      );
      throw new ForbiddenException('User account is not active');
    }

    // Comparaison du mot de passe haché
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      this.logger.warn(
        `Échec de la connexion : mot de passe incorrect pour ${email}`,
      );
      throw new UnauthorizedException('Password does not match');
    }

    // Génération du token d'accès
    const accessToken = await this.generateToken(user);

    this.logger.log(`Connexion réussie pour l'utilisateur ${email}`);
    return { access_token: accessToken };
  }

  // Méthode dédiée pour générer le JWT
  private async generateToken(user: User): Promise<string> {
    const payload = { username: user.firstName, role: user.role }; // Ajout de l'ID utilisateur
    return this.jwtService.signAsync(payload, { expiresIn: '1h' }); // Ajout d'une expiration de 1h
  }
}
