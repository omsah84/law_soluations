<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'law_solutions' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'k/WzqBguI0+Xq54tXKM7;PX?q}V%Sz+3CXM~+g#F)c/6gN2e4=S:zn]/vv88vRY!' );
define( 'SECURE_AUTH_KEY',  'V(,4+^Am}RAikD0<).nw2l/0]GJ}Uoc1K.-jaRri58y }>sreP F$ (2)~t<B>|e' );
define( 'LOGGED_IN_KEY',    ':Qf>$r#aDy!OqO&~cqv2O.L_]8SY<bm9[u[LMyV?S8=gk0tU=A{LQazV3wf eJOa' );
define( 'NONCE_KEY',        'tx8!E_3STW!2fF}*FtKwM|;Vze>,Eq4fde^*X_1y(p<lQ1.=Bl<$v?r?e-C]ID E' );
define( 'AUTH_SALT',        'i0[O=uT~S&=J/ELr>Q>C gpXJ>/V=t*Iz1kZVEp4(vMec=aO<bEqN-D5QdLVB0|Z' );
define( 'SECURE_AUTH_SALT', 'L+V6HRGHWnQU1rM$I|?B&Tu>QA2pcKB._ya)XOHiK0&VmBG[M-UV2LMI0V1+K;NG' );
define( 'LOGGED_IN_SALT',   'qwiOH`l,Afgkc*5~YoL|2<<=:[mO?f~H-ACuqM0dm7Z#iJ!YCWDYRIU*nbc`}R>d' );
define( 'NONCE_SALT',       'O<E7N;/H:LpR3O#X:%m?`@n+*0|Hd,EkKG17jvL!REIyD{`mxeekkM4}X?zLdB!O' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
