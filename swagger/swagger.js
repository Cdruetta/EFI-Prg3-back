const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Gestión de Alquiler de Autos',
            version: '1.0.0',
            description: 'API REST para la gestión completa de alquiler de vehículos. Incluye funcionalidades para usuarios, clientes, marcas, autos y alquileres.',
            contact: {
                name: 'ITEC',
                email: 'contacto@itec.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo local'
            },
            {
                url: 'https://gesti-nalquilerautosnodejs-production.up.railway.app',
                description: 'Servidor de producción'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token JWT para autenticación. Incluir en el header Authorization: Bearer <token>'
                }
            }
        },
        tags: [
            {
                name: 'Autenticación',
                description: 'Endpoints para login y gestión de sesiones'
            },
            {
                name: 'Usuarios',
                description: 'Gestión de usuarios del sistema (administradores y empleados)'
            },
            {
                name: 'Clientes',
                description: 'Gestión de clientes que alquilan vehículos'
            },
            {
                name: 'Marcas',
                description: 'Gestión de marcas de vehículos'
            },
            {
                name: 'Autos',
                description: 'Gestión del inventario de vehículos'
            },
            {
                name: 'Alquileres',
                description: 'Gestión de alquileres de vehículos'
            }
        ]
    },
    apis: ['./routes/*.js'] 
};

const specs = swaggerJsdoc(options);

module.exports = specs;