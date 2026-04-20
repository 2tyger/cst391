import { Routes } from '@angular/router';
import { RequestCreateComponent } from './pages/request-create/request-create.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { RequestEditComponent } from './pages/request-edit/request-edit.component';
import { RequestListComponent } from './pages/request-list/request-list.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'requests'
	},
	{
		path: 'requests',
		component: RequestListComponent
	},
	{
		path: 'requests/new',
		component: RequestCreateComponent
	},
	{
		path: 'requests/:id',
		component: RequestDetailsComponent
	},
	{
		path: 'requests/:id/edit',
		component: RequestEditComponent
	},
	{
		path: '**',
		redirectTo: 'requests'
	}
];
