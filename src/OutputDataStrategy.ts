export interface OutputDataStrategy {
    output() : void,
    data: ShelterAnimalContent[]
}

export interface ShelterAnimalContent {
         animal_id :  string ,
         animal_type :  string ,
         animal_breed :  string ,
         kennel_number :  string ,
         kennel_status :  string ,
         activity_number :  string ,
         activity_sequence :  string ,
         source_id :  string ,
         census_tract :  string ,
         council_district :  string ,
         intake_type :  string ,
         intake_subtype :  string ,
         intake_total :  string ,
         reason :  string ,
         staff_id :  string ,
         intake_date :  string ,
         intake_time :  string ,
         due_out :  string,
         intake_condition :  string ,
         hold_request :  string ,
         outcome_type :  string ,
         outcome_subtype :  string ,
         outcome_date :  string ,
         outcome_time :  string ,
         receipt_number :  string ,
         impound_number :  string,
         outcome_condition :  string ,
         chip_status :  string ,
         animal_origin :  string ,
         additional_information :  string ,
         month :  string ,
         year :  string
  }