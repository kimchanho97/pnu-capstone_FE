import { ReactComponent as AngularIcon } from "../assets/angular.svg";
import { ReactComponent as DjangoIcon } from "../assets/django.svg";
import { ReactComponent as DockerIcon } from "../assets/docker.svg";
import { ReactComponent as FastapiIcon } from "../assets/fastapi.svg";
import { ReactComponent as FlaskIcon } from "../assets/flask.svg";
import { ReactComponent as HtmlIcon } from "../assets/html.svg";
import { ReactComponent as KotlinIcon } from "../assets/kotlin.svg";
import { ReactComponent as MongodbIcon } from "../assets/mongodb.svg";
import { ReactComponent as MysqlIcon } from "../assets/mysql.svg";
import { ReactComponent as NestjsIcon } from "../assets/nestjs.svg";
import { ReactComponent as NextjsIcon } from "../assets/nextjs.svg";
import { ReactComponent as NginxIcon } from "../assets/nginx.svg";
import { ReactComponent as NodejsIcon } from "../assets/nodejs.svg";
import { ReactComponent as PostgresqlIcon } from "../assets/postgresql.svg";
import { ReactComponent as ReactIcon } from "../assets/react.svg";
import { ReactComponent as SpringIcon } from "../assets/spring.svg";
import { ReactComponent as SvelteIcon } from "../assets/svelte.svg";
import { ReactComponent as VueIcon } from "../assets/vue.svg";

export const templateIcons = [
  { Icon: ReactIcon, subtitle: "web", title: "React", value: "react" },
  { Icon: VueIcon, subtitle: "web", title: "Vue", value: "vue" },
  { Icon: AngularIcon, subtitle: "web", title: "Angular", value: "angular" },
  { Icon: HtmlIcon, subtitle: "web", title: "HTML", value: "html" },
  { Icon: SvelteIcon, subtitle: "web", title: "Svelte", value: "svelte" },
  { Icon: NextjsIcon, subtitle: "server", title: "Next.js", value: "nextjs" },
  { Icon: NestjsIcon, subtitle: "server", title: "Nest.js", value: "nestjs" },
  { Icon: NodejsIcon, subtitle: "server", title: "Node.js", value: "nodejs" },
  { Icon: KotlinIcon, subtitle: "server", title: "Kotlin", value: "kotlin" },
  { Icon: DjangoIcon, subtitle: "server", title: "Django", value: "django" },
  { Icon: FlaskIcon, subtitle: "server", title: "Flask", value: "flask" },
  { Icon: FastapiIcon, subtitle: "server", title: "FastAPI", value: "fastapi" },
  { Icon: SpringIcon, subtitle: "server", title: "Spring", value: "spring" },
  { Icon: NginxIcon, subtitle: "server", title: "Nginx", value: "nginx" },
  { Icon: DockerIcon, subtitle: "docker", title: "Docker", value: "docker" },
  { Icon: MysqlIcon, subtitle: "database", title: "MySQL", value: "mysql" },
  {
    Icon: MongodbIcon,
    subtitle: "database",
    title: "MongoDB",
    value: "mongodb",
  },
  {
    Icon: PostgresqlIcon,
    subtitle: "database",
    title: "PostgreSQL",
    value: "postgresql",
  },
];

export const icons = {
  react: ReactIcon,
  vue: VueIcon,
  angular: AngularIcon,
  html: HtmlIcon,
  svelte: SvelteIcon,
  nextjs: NextjsIcon,
  nestjs: NestjsIcon,
  nodejs: NodejsIcon,
  kotlin: KotlinIcon,
  django: DjangoIcon,
  flask: FlaskIcon,
  fastapi: FastapiIcon,
  spring: SpringIcon,
  nginx: NginxIcon,
  docker: DockerIcon,
  mysql: MysqlIcon,
  mongodb: MongodbIcon,
  postgresql: PostgresqlIcon,
};
