import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Make sure to import RouterLink if needed
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'] // Use 'styleUrls' instead of 'styleUrl'
})
export class NavigationComponent implements OnInit {
  productionVersion: string;
  toaster = inject(ToastrService);

  constructor( private _router:Router, private authService:AuthService) {
    this.productionVersion = ''; // Assign a value in the constructor
  }

  ngOnInit(): void {
    this.productionVersion = environment.productionVersion;
  }

  logout(){
    this.authService.logout().subscribe(response => {
      this.toaster.success("User logged out succefully", "Success")
      this._router.navigate(['/login'])
    });



  }
}

