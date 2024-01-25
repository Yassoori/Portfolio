// import { isEmpty } from 'lodash';
import IsEmpty from "../../validators/IsEmpty";


export const storeSession = ( session ) => {
	
	if ( IsEmpty( session ) ) {
		return null;
	}
	
	localStorage.setItem( 'x-wc-session', session );
}

export const getSession = () => {
	return localStorage.getItem( 'x-wc-session' );
}