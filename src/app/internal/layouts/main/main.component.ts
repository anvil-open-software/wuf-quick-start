import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {KgNavigationService} from '@kion/kg-ang-navigation';
import {KgConfigurationService} from '@kion/kg-ang-configuration';


@Component({
    selector: 'app-layout-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class LayoutMainComponent implements OnInit {

    // Set the URL from which to fetch the routes/navigation data object.
    // We're setting this to a dummy, local route for this app but you
    // can/should use a data service for a real app.
    navDataUrl: string = '/api/navigation';
    footerDataUrl: string = '/api/footer';

    navData: any;
    logoRoute: string = '/'; // Route path to take users when clicking on header logo
    configSubscription: any;

    constructor(private navService: KgNavigationService, public configService: KgConfigurationService) {
    }

    ngOnInit() {
        // Fetch nav data
        this.navService.getNavData(this.navDataUrl).subscribe(
            results => {
                this.navData = results.data.links;
            },
            err => {
                console.error('Error retrieving nav data:', err);
            }
        );
    }

}
